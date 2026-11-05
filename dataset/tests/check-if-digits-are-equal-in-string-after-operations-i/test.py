
class Solution:
    def hasSameDigits(self, s: str) -> bool:
        digits = [int(c) for c in s]
        while len(digits) > 2:
            digits = [(digits[i] + digits[i + 1]) % 10 for i in range(len(digits) - 1)]
        return digits[0] == digits[1]

def test_check_if_digits_are_equal_in_string_after_operations_i():
    sol = Solution()
    assert sol.hasSameDigits("3902") == True
    assert sol.hasSameDigits("34789") == False

if __name__ == '__main__':
    test_check_if_digits_are_equal_in_string_after_operations_i()
    print('All tests passed.')
