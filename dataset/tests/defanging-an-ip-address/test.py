class Solution:
    def defangIPaddr(self, address: str) -> str:
        return address.replace(".", "[.]")

def test():
    sol = Solution()
    assert sol.defangIPaddr("1.1.1.1") == "1[.]1[.]1[.]1", "test 1 failed"
    assert sol.defangIPaddr("255.100.50.0") == "255[.]100[.]50[.]0", "test 2 failed"
    print("✓ defanging-an-ip-address passed")

if __name__ == "__main__":
    test()
