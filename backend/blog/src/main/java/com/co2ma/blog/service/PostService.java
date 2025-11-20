package com.co2ma.blog.service;

import com.co2ma.blog.domain.Post;
import com.co2ma.blog.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    @Transactional(readOnly = true)
    public List<Post> findAllPosts() {
        return postRepository.findAll();
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
    public List<Post> findPostsByCategory(String category) {
        return postRepository.findByCategory(category);
    }

    @Transactional(readOnly = true)
    public List<Post> findTop10ByOrderByCreateDateDesc() {
        return postRepository.findTop10ByOrderByCreateDateDesc();
    }

    @Transactional(readOnly = true)
    public List<Post> findTop3ByCategoryOrderByCreateDateDesc(String category) {
        return postRepository.findTop3ByCategoryOrderByCreateDateDesc(category);
    }

}
