class Solution:
    def categorizeBox(self, length: int, width: int, height: int, mass: int) -> str:
        vol = length * width * height
        is_bulky = (length >= 10000 or width >= 10000 or height >= 10000 or vol >= 1000000000)
        is_heavy = mass >= 100
        if is_bulky and is_heavy:
            return 'Both'
        if is_bulky:
            return 'Bulky'
        if is_heavy:
            return 'Heavy'
        return 'Neither'
