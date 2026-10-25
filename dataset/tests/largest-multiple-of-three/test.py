class Solution:
    def largestMultipleOfThree(self, digits: list[int]) -> str:
        total = sum(digits)
        digits.sort(reverse=True)
        m1 = sorted([d for d in digits if d % 3 == 1])
        m2 = sorted([d for d in digits if d % 3 == 2])
        to_remove = []
        if total % 3 == 1:
            if m1:
                to_remove = [m1[0]]
            elif len(m2) >= 2:
                to_remove = [m2[0], m2[1]]
            else:
                return ""
        elif total % 3 == 2:
            if m2:
                to_remove = [m2[0]]
            elif len(m1) >= 2:
                to_remove = [m1[0], m1[1]]
            else:
                return ""
        for rem in to_remove:
            for i in range(len(digits) - 1, -1, -1):
                if digits[i] == rem:
                    digits.pop(i)
                    break
        if not digits:
            return ""
        if digits[0] == 0:
            return "0"
        return "".join(map(str, digits))

def test():
    sol = Solution()
    assert sol.largestMultipleOfThree([8,1,9]) == "981", "test 1 failed"
    assert sol.largestMultipleOfThree([8,6,7,1,0]) == "8760", "test 2 failed"
    assert sol.largestMultipleOfThree([1]) == "", "test 3 failed"
    print("✓ largest-multiple-of-three passed")

if __name__ == "__main__":
    test()
