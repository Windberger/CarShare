package at.htlkaindorf.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;


/**
* @author Mario Windberger
* @since 10.03.2025
*/
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {

//		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
//		System.setProperty("jwt.secret", dotenv.get("JWT_SECRET"));
//		System.setProperty("jwt.expiration", dotenv.get("JWT_EXPIRATION"));

		SpringApplication.run(BackendApplication.class, args);


	}



}
