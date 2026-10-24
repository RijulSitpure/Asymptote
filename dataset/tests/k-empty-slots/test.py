from typing import List

class Solution:
    def kEmptySlots(self, bulbs: List[int], k: int) -> int:
        n = len(bulbs)
        days = [0] * (n + 1)
        for day, pos in enumerate(bulbs, 1):
            days[pos] = day

        ans = float("inf")
        left, right = 1, k + 2
        i = 1
        while right <= n:
            if i < right:
                if days[i] < days[left] or days[i] < days[right]:
                    left = i
                    right = i + k + 1
                i += 1
            else:
                ans = min(ans, max(days[left], days[right]))
                left = right
                right = left + k + 1
                i = left + 1

        return ans if ans != float("inf") else -1

def test():
    sol = Solution()
    assert sol.kEmptySlots([1, 3, 2], 1) == 2, "test 1 failed"
    assert sol.kEmptySlots([1, 2, 3], 1) == -1, "test 2 failed"
    print("✓ k-empty-slots passed")

if __name__ == "__main__":
    test()
