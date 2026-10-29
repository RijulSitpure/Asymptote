import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'equal-rational-numbers.json')

from fractions import Fraction

class Solution:
    def isRationalEqual(self, s: str, t: str) -> bool:
        def to_fraction(text):
            if '(' not in text:
                return Fraction(text)
            dot = text.find('.')
            paren = text.find('(')
            int_part = text[:dot]
            non_rep = text[dot + 1:paren]
            rep = text[paren + 1:-1]
            ans = Fraction(int(int_part))
            if non_rep:
                ans += Fraction(int(non_rep), 10 ** len(non_rep))
            if rep:
                ans += Fraction(int(rep), 10 ** len(non_rep) * (10 ** len(rep) - 1))
            return ans

        return to_fraction(s) == to_fraction(t)

sol = Solution()
assert sol.isRationalEqual("0.(52)", "0.5(25)") is True
assert sol.isRationalEqual("0.1666(6)", "0.166(66)") is True
assert sol.isRationalEqual("0.9(9)", "1.") is True
print("✓ equal-rational-numbers passed")
