from typing import List

class Solution:
    def numsSameConsecDiff(self, n: int, k: int) -> List[int]:
        curr = list(range(1, 10))
        for _ in range(n - 1):
            next_level = []
            for num in curr:
                last = num % 10
                candidates = {last + k, last - k}
                for cand in candidates:
                    if 0 <= cand <= 9:
                        next_level.append(num * 10 + cand)
            curr = next_level
        return curr

def test():
    sol = Solution()
    assert sorted(sol.numsSameConsecDiff(3, 7)) == [181, 292, 707, 818, 929], "test 1 failed"
    assert sorted(sol.numsSameConsecDiff(2, 1)) == [10, 12, 21, 23, 32, 34, 43, 45, 54, 56, 65, 67, 76, 78, 87, 89, 98], "test 2 failed"
    print("✓ numbers-with-same-consecutive-differences passed")

if __name__ == "__main__":
    test()
