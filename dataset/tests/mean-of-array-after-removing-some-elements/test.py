class Solution:
    def trimMean(self, arr: list[int]) -> float:
        arr.sort()
        n = len(arr)
        k = n // 20
        trimmed = arr[k : n - k]
        return sum(trimmed) / len(trimmed)

def test():
    sol = Solution()
    assert abs(sol.trimMean([1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]) - 2.0) < 1e-5
    assert abs(sol.trimMean([6,2,7,5,1,2,0,3,10,2,5,0,5,5,0,8,7,6,8,0]) - 4.0) < 1e-5

    print("✓ mean-of-array-after-removing-some-elements passed")

if __name__ == '__main__':
    test()
