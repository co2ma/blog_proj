package com.co2ma.blog.repository;

import com.co2ma.blog.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findByCategory(String category);
    List<Post> findTop10ByOrderByCreateDateDesc();
    List<Post> findTop3ByCategoryOrderByCreateDateDesc(String category);
}
