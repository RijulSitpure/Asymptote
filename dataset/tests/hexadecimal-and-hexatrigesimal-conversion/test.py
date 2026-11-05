class Solution:
    def convertBase(self, val: str, from_base: int, to_base: int) -> str:
        # Digits 0-9 then A-Z
        digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        
        # Parse val in from_base
        num = 0
        for ch in val.upper():
            num = num * from_base + digits.index(ch)
            
        if num == 0:
            return "0"
            
        res = []
        while num > 0:
            res.append(digits[num % to_base])
            num //= to_base
            
        return "".join(reversed(res))

def run_tests():
    s = Solution()
    res1 = s.convertBase("FF", 16, 10)
    assert res1 == "255", f"Expected 255, got {res1}"
    res2 = s.convertBase("Z", 36, 16)
    assert res2 == "23", f"Expected 23, got {res2}" # 35 in hex is 2 * 16 + 3 = 23
    print("3602 hexadecimal-and-hexatrigesimal-conversion PASSED")

if __name__ == "__main__":
    run_tests()
