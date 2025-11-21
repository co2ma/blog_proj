package com.co2ma.blog.repository;

import com.co2ma.blog.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {
    Page<Post> findByCategory(Pageable pageable, String category);
    Page<Post> findByCategoryNot(Pageable pageable, String category);

    List<Post> findTop10ByOrderByCreateDateDesc();
    List<Post> findTop3ByCategoryOrderByCreateDateDesc(String category);
}
