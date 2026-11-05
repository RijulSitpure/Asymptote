class Solution:
    def countBinaryPalindromes(self, n: int) -> int:
        count = 0
        for x in range(1, n + 1):
            b = bin(x)[2:]
            if b == b[::-1]:
                count += 1
        return count

def run_tests():
    sol = Solution()
    assert sol.countBinaryPalindromes(5) == 3
    assert sol.countBinaryPalindromes(1) == 1
    assert sol.countBinaryPalindromes(7) == 4 # 1('1'), 3('11'), 5('101'), 7('111') -> 4
    print("All tests passed for 3677.")

if __name__ == "__main__":
    run_tests()
