package seb43_pre_027.demo.auth.repository;

import org.springframework.data.repository.CrudRepository;
import seb43_pre_027.demo.auth.entity.RefreshToken;

import java.util.Collection;


public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
    RefreshToken findByRefreshToken(String RefreshToken);

}
