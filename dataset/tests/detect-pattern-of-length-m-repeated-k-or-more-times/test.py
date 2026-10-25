class Solution:
    def containsPattern(self, arr: list[int], m: int, k: int) -> bool:
        count = 0
        for i in range(len(arr) - m):
            if arr[i] == arr[i + m]:
                count += 1
            else:
                count = 0
            if count == (k - 1) * m:
                return True
        return False

def test():
    sol = Solution()
    assert sol.containsPattern([1,2,4,4,4,4], 1, 3) == True, "test 1 failed"
    assert sol.containsPattern([1,2,1,2,1,1,1,3], 2, 2) == True, "test 2 failed"
    assert sol.containsPattern([1,2,1,2,1,3], 2, 3) == False, "test 3 failed"
    print("✓ detect-pattern-of-length-m-repeated-k-or-more-times passed")

if __name__ == "__main__":
    test()
