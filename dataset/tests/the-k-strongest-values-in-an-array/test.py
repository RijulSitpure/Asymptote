class Solution:
    def getStrongest(self, arr: list[int], k: int) -> list[int]:
        arr.sort()
        n = len(arr)
        m = arr[(n - 1) // 2]
        left, right = 0, n - 1
        res = []
        for _ in range(k):
            if abs(arr[right] - m) >= abs(arr[left] - m):
                res.append(arr[right])
                right -= 1
            else:
                res.append(arr[left])
                left += 1
        return res

def test():
    sol = Solution()
    assert sol.getStrongest([1,2,3,4,5], 2) == [5,1], "test 1 failed"
    assert sol.getStrongest([1,1,3,5,5], 2) == [5,5], "test 2 failed"
    assert sol.getStrongest([6,7,11,7,6,8], 5) == [11,8,6,6,7], "test 3 failed"
    print("✓ the-k-strongest-values-in-an-array passed")

if __name__ == "__main__":
    test()
