package seb43_pre_027.demo.security.auth.repository;

import org.springframework.data.repository.CrudRepository;
import seb43_pre_027.demo.security.auth.entity.RefreshToken;


public interface RefreshTokenRepository extends CrudRepository<RefreshToken, Long> {
    RefreshToken findByRefreshToken(String RefreshToken);

}
