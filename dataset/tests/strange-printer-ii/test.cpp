#include <cassert>
#include <vector>
#include "solution.cpp"

int main() {
    Solution sol;
    std::vector<std::vector<int>> g1 = {{1,1,1,1},{1,2,2,1},{1,2,2,1},{1,1,1,1}};
    assert(sol.isPrintable(g1) == true);
    std::vector<std::vector<int>> g2 = {{1,1,1,1},{1,1,3,3},{1,1,3,4},{5,5,1,4}};
    assert(sol.isPrintable(g2) == true);
    std::vector<std::vector<int>> g3 = {{1,2,1},{2,1,2},{1,2,1}};
    assert(sol.isPrintable(g3) == false);
    return 0;
}