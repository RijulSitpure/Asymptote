class Solution:
    def countGoodTriplets(self, arr: list[int], a: int, b: int, c: int) -> int:
        n = len(arr)
        ans = 0
        for i in range(n):
            for j in range(i + 1, n):
                if abs(arr[i] - arr[j]) <= a:
                    for k in range(j + 1, n):
                        if abs(arr[j] - arr[k]) <= b and abs(arr[i] - arr[k]) <= c:
                            ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.countGoodTriplets([3,0,1,1,9,7], 7, 2, 3) == 4, "test 1 failed"
    assert sol.countGoodTriplets([1,1,2,2,3], 0, 0, 1) == 0, "test 2 failed"
    print("✓ count-good-triplets passed")

if __name__ == "__main__":
    test()
