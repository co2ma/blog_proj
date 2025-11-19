package com.co2ma.blog.Controller;

import com.co2ma.blog.domain.Post;
import com.co2ma.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {
    private final PostService postService;

    @Value("${blog.security.api-key}")
    private String requiredApiKey;

    @GetMapping()
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postService.findAllPosts();
        return ResponseEntity.ok().body(posts);
    }

    @PostMapping // ✅ HTTP 헤더에서 키를 받아 검증합니다.
    public ResponseEntity<Post> savePost(
            @RequestBody Post post,
            @RequestHeader(value = "X-API-KEY", required = true) String apiKey) { // 🔑 헤더에서 키를 받음

        log.info("▶️ POST /api/posts 요청 수신.");

        // 1. API Key 검증
        if (!requiredApiKey.equals(apiKey)) {
            log.warn("❌ 접근 거부: 유효하지 않은 API Key가 감지되었습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // 401 Unauthorized
        }

        try {
            // 2. 서비스로 저장 위임 (Post 객체는 순수 데이터만 포함)
            Post savedPost = postService.savePost(post);
            log.info("✅ 포스트 ID {} 저장 완료.", savedPost.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPost); // 201 Created

        } catch (Exception e) {
            log.error("🛑 포스트 저장 중 예외 발생.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPostById(@PathVariable Long id) {
        try{
            return ResponseEntity.ok().body(postService.findPostById(id));
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping // ✅ 삭제 기능에도 API Key 검증을 추가합니다.
    public ResponseEntity<Void> deletePost(
            @RequestBody Post post,
            @RequestHeader(value = "X-API-KEY", required = true) String apiKey) {

        log.info("▶️ DELETE /api/posts 요청 수신. Post ID: {}", post.getId());

        // 1. API Key 검증
        if (!requiredApiKey.equals(apiKey)) {
            log.warn("❌ 삭제 접근 거부: 유효하지 않은 API Key.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            postService.deletePostById(post.getId());
            log.info("✅ 포스트 ID {} 삭제 완료.", post.getId());
            return ResponseEntity.noContent().build(); // 204 No Content

        } catch (Exception e) {
            log.error("🛑 포스트 삭제 중 예외 발생: ID {}", post.getId(), e);
            return ResponseEntity.notFound().build();
        }
    }
}
