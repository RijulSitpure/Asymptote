from typing import List

class Solution:
    def validateCoupons(self, coupons: List[str]) -> List[str]:
        valid = []
        for code in coupons:
            # Rule 1: Length must be between 8 and 12 characters
            if not (8 <= len(code) <= 12):
                continue
            # Rule 2: Alphanumeric characters only
            if not code.isalnum():
                continue
            # Rule 3: Must start with uppercase letters (at least 2)
            if not (code[0].isupper() and code[1].isupper()):
                continue
            # Rule 4: Must contain at least one digit
            if not any(ch.isdigit() for ch in code):
                continue
            valid.append(code)
        return valid

def run_tests():
    s = Solution()
    res1 = s.validateCoupons(["DISCOUNT20", "SAVE50", "AB12345678", "abc12345"])
    assert res1 == ["DISCOUNT20", "AB12345678"], f"Expected ['DISCOUNT20', 'AB12345678'], got {res1}"
    res2 = s.validateCoupons(["INVALID"])
    assert res2 == [], f"Expected [], got {res2}"
    print("3606 coupon-code-validator PASSED")

if __name__ == "__main__":
    run_tests()
