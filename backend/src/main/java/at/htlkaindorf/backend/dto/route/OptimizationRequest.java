package at.htlkaindorf.backend.dto.route;

import java.util.List;

public record OptimizationRequest(
        List<OptimizationJob> jobs,
        List<OptimizationVehicle> vehicles,
        Options options
) {
    public record OptimizationJob(int id, double[] location) {}
    public record OptimizationVehicle(int id, double[] start, double[] end, String profile) {}
    public record Options(boolean plan) {}
}
