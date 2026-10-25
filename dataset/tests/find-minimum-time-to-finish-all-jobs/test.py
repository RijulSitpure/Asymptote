class Solution:
    def minimumTimeRequired(self, jobs: list[int], k: int) -> int:
        jobs.sort(reverse=True)
        workers = [0] * k
        self.ans = sum(jobs)

        def backtrack(idx: int) -> None:
            if idx == len(jobs):
                self.ans = min(self.ans, max(workers))
                return
            job = jobs[idx]
            for i in range(k):
                if workers[i] + job >= self.ans:
                    continue
                workers[i] += job
                backtrack(idx + 1)
                workers[i] -= job
                if workers[i] == 0:
                    break

        backtrack(0)
        return self.ans

def test():
    sol = Solution()
    assert sol.minimumTimeRequired([3,2,3], 3) == 3
    assert sol.minimumTimeRequired([1,2,4,7,8], 2) == 11

    print("✓ find-minimum-time-to-finish-all-jobs passed")

if __name__ == '__main__':
    test()
