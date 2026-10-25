class Solution:
    def canArrange(self, arr: list[int], k: int) -> bool:
        rem = [0] * k
        for x in arr:
            rem[(x % k + k) % k] += 1
        if rem[0] % 2 != 0:
            return False
        for i in range(1, k):
            if rem[i] != rem[k - i]:
                return False
        return True

def test():
    sol = Solution()
    assert sol.canArrange([1,2,3,4,5,10,6,7,8,9], 5) == True, "test 1 failed"
    assert sol.canArrange([1,2,3,4,5,6], 7) == True, "test 2 failed"
    assert sol.canArrange([1,2,3,4,5,6], 10) == False, "test 3 failed"
    print("✓ check-if-array-pairs-are-divisible-by-k passed")

if __name__ == "__main__":
    test()
