package at.htlkaindorf.backend.exception;

public class UserCreationException extends RuntimeException {
    public UserCreationException(String message) {
        super(message);
    }
}
