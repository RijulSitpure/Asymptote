class Solution:
    def countTriplets(self, arr: list[int]) -> int:
        n = len(arr)
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = pref[i] ^ arr[i]
        ans = 0
        for i in range(n):
            for k in range(i + 1, n):
                if pref[i] == pref[k + 1]:
                    ans += k - i
        return ans

def test():
    sol = Solution()
    assert sol.countTriplets([2,3,1,6,7]) == 4, "test 1 failed"
    assert sol.countTriplets([1,1,1,1,1]) == 10, "test 2 failed"
    print("✓ count-triplets-that-can-form-two-arrays-of-equal-xor passed")

if __name__ == "__main__":
    test()
