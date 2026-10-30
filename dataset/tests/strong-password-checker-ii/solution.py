class Solution:
    def strongPasswordCheckerII(self, password: str) -> bool:
        if len(password) < 8:
            return False
        has_lower = False
        has_upper = False
        has_digit = False
        has_special = False
        specials = set("!@#$%^&*()-+")
        
        for i, ch in enumerate(password):
            if i > 0 and ch == password[i - 1]:
                return False
            if ch.islower():
                has_lower = True
            elif ch.isupper():
                has_upper = True
            elif ch.isdigit():
                has_digit = True
            elif ch in specials:
                has_special = True
                
        return has_lower and has_upper and has_digit and has_special
