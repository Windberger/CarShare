package at.htlkaindorf.backend.exception;

//TODO: Löschen falls nicht notwendig

public class MissingParameterException extends RuntimeException {
  public MissingParameterException(String message) {
    super(message);
  }
}
