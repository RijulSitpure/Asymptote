from typing import List

class Solution:
    def beautifulArray(self, n: int) -> List[int]:
        res = [1]
        while len(res) < n:
            res = [2 * x - 1 for x in res] + [2 * x for x in res]
        return [x for x in res if x <= n]

def verify_beautiful(arr):
    n = len(arr)
    pos = {val: i for i, val in enumerate(arr)}
    for i in range(n):
        for j in range(i + 1, n):
            total = arr[i] + arr[j]
            if total % 2 == 0:
                mid = total // 2
                if mid in pos and i < pos[mid] < j:
                    return False
    return True

def test():
    sol = Solution()
    res4 = sol.beautifulArray(4)
    assert sorted(res4) == [1, 2, 3, 4] and verify_beautiful(res4), "test 4 failed"
    res5 = sol.beautifulArray(5)
    assert sorted(res5) == [1, 2, 3, 4, 5] and verify_beautiful(res5), "test 5 failed"
    print("✓ beautiful-array passed")

if __name__ == "__main__":
    test()
