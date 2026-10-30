class Solution:
    def minimumTime(self, jobs: list[int], workers: list[int]) -> int:
        jobs.sort()
        workers.sort()
        return max((j + w - 1) // w for j, w in zip(jobs, workers))
