class Solution:
    def minimumCosts(self, regular: list[int], express: list[int], expressCost: int) -> list[int]:
        dp_reg = 0
        dp_exp = expressCost
        ans = []
        for r, e in zip(regular, express):
            new_reg = min(dp_reg + r, dp_exp + r)
            new_exp = min(dp_exp + e, dp_reg + expressCost + e)
            dp_reg, dp_exp = new_reg, new_exp
            ans.append(min(dp_reg, dp_exp))
        return ans
