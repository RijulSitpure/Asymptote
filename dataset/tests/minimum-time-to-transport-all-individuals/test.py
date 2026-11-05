from typing import List

class Solution:
    def minTimeToTransport(self, positions: List[int], speeds: List[int], k: int) -> int:
        times = [(pos + spd - 1) // spd for pos, spd in zip(positions, speeds)]
        times.sort()
        # Batches of size k: each batch takes max time of the batch
        # To transport all individuals, group into batches of up to k
        batches = [times[i] for i in range(k - 1, len(times), k)]
        if len(times) % k != 0:
            batches.append(times[-1])
        return max(batches) if batches else 0

def run_tests():
    s = Solution()
    res1 = s.minTimeToTransport([10, 20], [5, 5], 2) # times: [2, 4], batch of 2 takes 4
    assert res1 == 4, f"Expected 4, got {res1}"
    res2 = s.minTimeToTransport([10, 10, 10], [5, 2, 1], 2) # times: [2, 5, 10]
    assert res2 == 10, f"Expected 10, got {res2}"
    print("3594 minimum-time-to-transport-all-individuals PASSED")

if __name__ == "__main__":
    run_tests()
