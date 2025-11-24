package com.co2ma.blog.service;

import com.co2ma.blog.domain.Post;
import com.co2ma.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public Page<Post> findAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    @Transactional
    public Post savePost(Post post) {
        return postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public Post findPostById(Long id) {
        return postRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deletePostById(Long id) {
        postRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Page<Post> findPostsByCategory(Pageable pageable, String category) {
        return postRepository.findByCategory(pageable, category);
    }

    @Transactional(readOnly = true)
    public Page<Post> findPostsExcludingCategory(Pageable pageable, String category) {
        return postRepository.findByCategoryNot(pageable, category);
    }

    @Transactional(readOnly = true)
    public List<Post> findRecently(String category) {
        if (category == "" || category.isEmpty()) {
            return postRepository.findTop10ByOrderByCreateDateDesc();
        } else {
            return postRepository.findTop3ByCategoryOrderByCreateDateDesc(category);
        }
    }


}
