from typing import List

class Solution:
    def pancakeSort(self, arr: List[int]) -> List[int]:
        res = []
        n = len(arr)
        for target in range(n, 1, -1):
            idx = arr.index(target)
            if idx == target - 1:
                continue
            if idx > 0:
                res.append(idx + 1)
                arr[:idx + 1] = reversed(arr[:idx + 1])
            res.append(target)
            arr[:target] = reversed(arr[:target])
        return res

def test():
    sol = Solution()
    arr = [3, 2, 4, 1]
    flips = sol.pancakeSort(list(arr))
    for k in flips:
        arr[:k] = reversed(arr[:k])
    assert arr == [1, 2, 3, 4], "test 1 failed"
    print("✓ pancake-sorting passed")

if __name__ == "__main__":
    test()
