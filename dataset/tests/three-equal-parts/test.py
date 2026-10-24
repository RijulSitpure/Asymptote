from typing import List

class Solution:
    def threeEqualParts(self, arr: List[int]) -> List[int]:
        total = sum(arr)
        if total % 3 != 0:
            return [-1, -1]
        if total == 0:
            return [0, len(arr) - 1]

        k = total // 3
        p1 = p2 = p3 = -1
        cnt = 0
        for i, x in enumerate(arr):
            if x == 1:
                cnt += 1
                if cnt == 1:
                    p1 = i
                elif cnt == k + 1:
                    p2 = i
                elif cnt == 2 * k + 1:
                    p3 = i

        while p3 < len(arr):
            if arr[p1] != arr[p2] or arr[p2] != arr[p3]:
                return [-1, -1]
            p1 += 1
            p2 += 1
            p3 += 1
        return [p1 - 1, p2]

def test():
    sol = Solution()
    assert sol.threeEqualParts([1, 0, 1, 0, 1]) == [0, 3], "test 1 failed"
    assert sol.threeEqualParts([1, 1, 0, 1, 1]) == [-1, -1], "test 2 failed"
    assert sol.threeEqualParts([1, 1, 0, 0, 1]) == [0, 2], "test 3 failed"
    print("✓ three-equal-parts passed")

if __name__ == "__main__":
    test()
