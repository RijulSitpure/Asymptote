#include <cassert>
#include "solution.cpp"

int main() {
    Solution sol;
    TreeNode* r1 = new TreeNode(1,
            new TreeNode(10, new TreeNode(3, new TreeNode(12), new TreeNode(8)), nullptr),
            new TreeNode(4, new TreeNode(7, new TreeNode(6), nullptr), new TreeNode(9, nullptr, new TreeNode(2))));
    assert(sol.isEvenOddTree(r1) == true);
    TreeNode* r2 = new TreeNode(5, new TreeNode(4, new TreeNode(3), new TreeNode(3)), new TreeNode(2, new TreeNode(7), nullptr));
    assert(sol.isEvenOddTree(r2) == false);
    return 0;
}