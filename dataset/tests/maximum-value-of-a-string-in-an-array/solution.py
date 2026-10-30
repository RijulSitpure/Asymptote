class Solution:
    def maximumValue(self, strs: list[str]) -> int:
        def get_val(s):
            return int(s) if s.isdigit() else len(s)
        return max(get_val(s) for s in strs)
