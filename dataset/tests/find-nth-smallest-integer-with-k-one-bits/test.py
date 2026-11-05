import math

class Solution:
    def findNthInteger(self, n: int, k: int) -> int:
        ans = 0
        rem_k = k
        
        for bit in range(60, -1, -1):
            if rem_k == 0:
                break
            ways_with_zero = math.comb(bit, rem_k)
            if n > ways_with_zero:
                ans |= (1 << bit)
                n -= ways_with_zero
                rem_k -= 1
        return ans

def run_tests():
    sol = Solution()
    # k=1 set bits: 1 (1st), 2 (2nd), 4 (3rd), 8 (4th)
    assert sol.findNthInteger(1, 1) == 1
    assert sol.findNthInteger(2, 1) == 2
    assert sol.findNthInteger(3, 1) == 4
    # k=2 set bits: 3 (011, 1st), 5 (101, 2nd), 6 (110, 3rd)
    assert sol.findNthInteger(1, 2) == 3
    assert sol.findNthInteger(2, 2) == 5
    assert sol.findNthInteger(3, 2) == 6
    print("All tests passed for 3821.")

if __name__ == "__main__":
    run_tests()
