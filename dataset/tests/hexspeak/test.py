class Solution:
    def toHexspeak(self, num: str) -> str:
        h = hex(int(num))[2:].upper()
        res = []
        for ch in h:
            if ch == '0':
                res.append('O')
            elif ch == '1':
                res.append('I')
            elif ch in 'ABCDEF':
                res.append(ch)
            else:
                return 'ERROR'
        return ''.join(res)

def test():
    sol = Solution()
    assert sol.toHexspeak("257") == "IOI", "test 1 failed"
    assert sol.toHexspeak("3") == "ERROR", "test 2 failed"
    print("✓ hexspeak passed")

if __name__ == "__main__":
    test()
