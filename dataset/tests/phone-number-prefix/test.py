class Solution:
    def phonePrefix(self, numbers: list[str]) -> bool:
        numbers.sort()
        for i in range(1, len(numbers)):
            if numbers[i].startswith(numbers[i - 1]):
                return False
        return True

def run_tests():
    s = Solution()
    assert s.phonePrefix(["911", "97625999", "91125426"]) == False
    assert s.phonePrefix(["113", "12340", "123440", "98346"]) == True
    print("All tests passed for phone-number-prefix")

if __name__ == '__main__':
    run_tests()
