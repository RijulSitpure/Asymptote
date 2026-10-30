class Solution:
    def distMoney(self, money: int, children: int) -> int:
        if money < children:
            return -1
        money -= children
        k = money // 7
        if k > children:
            return children - 1
        if k == children:
            return children if money % 7 == 0 else children - 1
        if k == children - 1 and money % 7 == 3:
            return k - 1
        return k
