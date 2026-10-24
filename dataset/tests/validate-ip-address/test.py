import sys

class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        if queryIP.count(".") == 3:
            parts = queryIP.split(".")
            for p in parts:
                if not p or len(p) > 3:
                    return "Neither"
                if len(p) > 1 and p[0] == "0":
                    return "Neither"
                if not p.isdigit() or int(p) > 255:
                    return "Neither"
            return "IPv4"
        elif queryIP.count(":") == 7:
            parts = queryIP.split(":")
            hexdigits = "0123456789abcdefABCDEF"
            for p in parts:
                if not p or len(p) > 4:
                    return "Neither"
                if any(c not in hexdigits for c in p):
                    return "Neither"
            return "IPv6"
        return "Neither"

def test():
    sol = Solution()
    assert sol.validIPAddress("172.16.254.1") == "IPv4", "test 1 failed"
    assert sol.validIPAddress("2001:0db8:85a3:0:0:8A2E:0370:7334") == "IPv6", "test 2 failed"
    assert sol.validIPAddress("256.256.256.256") == "Neither", "test 3 failed"
    print("✓ validate-ip-address passed")

if __name__ == "__main__":
    test()
