class Solution:
    def distanceTraveled(self, mainTank: int, additionalTank: int) -> int:
        ans = 0
        while mainTank >= 5:
            mainTank -= 5
            ans += 50
            if additionalTank >= 1:
                additionalTank -= 1
                mainTank += 1
        ans += mainTank * 10
        return ans
