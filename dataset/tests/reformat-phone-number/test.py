class Solution:
    def reformatNumber(self, number: str) -> str:
        digits = [c for c in number if c.isdigit()]
        blocks = []
        i = 0
        n = len(digits)
        while n - i > 4:
            blocks.append("".join(digits[i : i + 3]))
            i += 3
        if n - i == 4:
            blocks.append("".join(digits[i : i + 2]))
            blocks.append("".join(digits[i + 2 : i + 4]))
        else:
            blocks.append("".join(digits[i:n]))
        return "-".join(blocks)

def test():
    sol = Solution()
    assert sol.reformatNumber("1-23-45 6") == "123-456"
    assert sol.reformatNumber("123 4-567") == "123-45-67"
    assert sol.reformatNumber("123 4-5678") == "123-456-78"

    print("✓ reformat-phone-number passed")

if __name__ == '__main__':
    test()
