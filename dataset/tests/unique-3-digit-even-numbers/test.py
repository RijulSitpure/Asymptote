class Solution:
    def totalNumbers(self, digits: list[int]) -> int:
        s = set()
        n = len(digits)
        for i in range(n):
            if digits[i] == 0:
                continue
            for j in range(n):
                if i == j:
                    continue
                for k in range(n):
                    if k == i or k == j:
                        continue
                    if digits[k] % 2 != 0:
                        continue
                    num = digits[i] * 100 + digits[j] * 10 + digits[k]
                    s.add(num)
        return len(s)

def test_unique_3_digit_even_numbers():
    sol = Solution()
    assert sol.totalNumbers([2, 1, 3, 0]) == 10
    assert sol.totalNumbers([2, 2, 8, 8, 2]) == 7

if __name__ == '__main__':
    test_unique_3_digit_even_numbers()
    print('All tests passed.')
