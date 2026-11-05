class Solution:
    def minimumTime(self, deliveries: list[int], workers: list[int]) -> int:
        # Each worker i can deliver 1 package in workers[i] time
        # Find minimum time T such that total packages delivered >= sum(deliveries)
        target = sum(deliveries)
        low, high = 1, target * min(workers)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            total = sum(mid // w for w in workers)
            if total >= target:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def run_tests():
    sol = Solution()
    # deliveries sum = 5, workers = [1, 2].
    # In time 3: worker 0 delivers 3, worker 1 delivers 1 -> total 4 < 5.
    # In time 4: worker 0 delivers 4, worker 1 delivers 2 -> total 6 >= 5.
    assert sol.minimumTime([2, 3], [1, 2]) == 4
    assert sol.minimumTime([10], [5]) == 50
    print("All tests passed for 3733.")

if __name__ == "__main__":
    run_tests()