package com.co2ma.blog.Controller;

import com.co2ma.blog.domain.Post;
import com.co2ma.blog.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "https://blog-proj-psi.vercel.app")
public class PostController {
    private final PostService postService;

    @Value("${blog.security.api-key}")
    private String requiredApiKey;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getPosts(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int size,
            @RequestParam(defaultValue = "posts") String category
    ) {
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by("createDate").descending());
        Page<Post> postsPage;
        if(category.equals("posts")) postsPage = postService.findPostsExcludingCategory(pageRequest, "review");
        else postsPage = postService.findPostsByCategory(pageRequest, category);

        Map<String, Object> response = new HashMap<>();
        response.put("data", postsPage.getContent());
        response.put("currentPage", postsPage.getNumber() + 1);
        response.put("totalPages", postsPage.getTotalPages());
        response.put("totalItems", postsPage.getTotalElements());

        return ResponseEntity.ok(response);
    }


    @GetMapping("/recently")
    public ResponseEntity<List<Post>> getRecentlyPosts(
            @RequestParam(value = "category", defaultValue = "") String category
    ) {
        List<Post> posts = postService.findTop3ByCategoryOrderByCreateDateDesc(category);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Long id,
            @RequestHeader("X-API-KEY") String apiKey
    ) {
        log.info("▶️ DELETE /api/posts/{} 요청 수신", id);

        // API KEY 검증
        if (!requiredApiKey.equals(apiKey)) {
            log.warn("❌ 삭제 접근 거부: 유효하지 않은 API Key.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            postService.deletePostById(id);
            log.info("🗑️ 포스트 ID {} 삭제 완료.", id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("🛑 포스트 삭제 중 예외 발생. ID {}", id, e);
            return ResponseEntity.notFound().build();
        }
    }

}
