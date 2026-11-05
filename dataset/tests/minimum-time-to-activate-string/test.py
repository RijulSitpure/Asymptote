from typing import List

class Solution:
    def minTimeToActivate(self, s: str, order: List[int], k: int) -> int:
        n = len(s)
        def check(time: int) -> bool:
            active = [False] * n
            for t in range(time):
                active[order[t]] = True
            cur_consecutive = 0
            for val in active:
                if not val:
                    cur_consecutive += 1
                    if cur_consecutive >= k:
                        return False
                else:
                    cur_consecutive = 0
            return True
        low, high = 1, len(order)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans

def run_tests():
    sol = Solution()
    assert sol.minTimeToActivate("abcde", [2, 0, 4, 1, 3], 2) == 3
    assert sol.minTimeToActivate("aaaa", [0, 1, 2, 3], 1) == 4
    print("All tests passed for 3639.")

if __name__ == "__main__":
    run_tests()
