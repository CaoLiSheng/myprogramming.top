---
style: github
title: TDD vs. BDD
date: 2021-03-31
tags:
  - Web
  - TDD
  - BDD
---

## 关键不同对比

<div class="key-diffs">
<style>
@media only screen and (min-width: 1080px) {
  .markdown-body .key-diffs + .table>table tr>*:first-child { width: 10em; }
  .markdown-body .key-diffs + .table>table tr>*:not(:first-child) { width: calc((var(--mdvw) * 100 - 10em) / 2); }
}
</style>
</div>

+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 缩写         | TDD                                                 | BDD                                                 |
+:=============+=====================================================+=====================================================+
| 全称         | Test Driven Development                             | Behavior Driven Development                         |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 开端         | 以编写“测试用例”为开端                            | 首先根据预期的行为编写一个“场景”                  |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 关注点       | 主要关注如何实现功能                                | 关注最终用户的应用程序行为                          |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 编写语言     | 测试用例是用编程语言编写的                          | 与 TDD 相比，场景更具可读性，                       |
|              |                                                     | 因为它们是以简单的自然语言格式编写的                |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 受功能影响度 | 应用程序功能的变化对 TDD 中的测试用例有很大影响     | BDD 场景不受功能更改的太大影响                      |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 协作方       | 只有开发人员之间才需要协作                          | 所有利益相关者之间需要协作                          |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 适合的项目   | 对于涉及API和第三方工具的项目来说，                 | 对于由用户操作驱动的项目来说，                      |
|              | 这可能是一种更好的方法                              | 这可能是一种更好的方法。                            |
|              |                                                     | 例如：电子商务网站、应用系统等                      |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 支持的工具   | 一些支持 TDD 的工具有：JUnit、TestNG、NUnit 等      | 支持 BDD 的一些工具有：SpecFlow、Cucumber、MSpec 等 |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 可理解人群   | TDD 中的测试只能被有编程知识的人理解                | BDD 中的测试可以被任何人理解，                      |
|              |                                                     | 包括那些没有任何编程知识的人                        |
+--------------+-----------------------------------------------------+-----------------------------------------------------+
| 对错误影响度 | TDD 降低了测试中出现 bug 的可能性                   | 与 TDD 相比，测试中的 bug 很难跟踪                  |
+--------------+-----------------------------------------------------+-----------------------------------------------------+

## TDD 过程

1. 写一个测试用例
2. 执行所有测试用例
3. 为测试用例开发代码（实现功能代码）
4. 再次执行测试用例
5. 重构代码（可选步骤）
6. 不断重复 1-5 步骤

![TDD 流程图](BDD-vs-TDD/TDD-Flowchart.jpg)

## BDD 过程

1. 由**项目所有者**或**业务分析师**或**质量保证部门**（QA）写应用程序的行为描述文档
2. 写自动化测试脚本
3. 实现功能代码
4. 检查应用程序行为是否正确（执行自动化脚本）
5. 重构代码（可选步骤）
6. 不断重复 1-5 步骤

## 例子

首先假设功能代码如下（实际中应当在第三步出现，这里 TDD 和 BDD 演示同一个功能，方便起见）：

```java
public class LoginPage{
  String username = "";
  String password = "";
  //store username
  public void enterUserName(String username){
    this.username = username;
  }
  //store password
  public void enterPassword(String password){
    this.password = password;
  }
  //match username and passowrd in db and return home page
  public HomePage submit(){
    if(username.existsInDB()){
      String dbPassword = getPasswordFromDB(username);
      if(dbPassword.equals(password){
        Return new HomePage();
      }
    }
  }
}
```

### TDD 测试用例

```java
@Test
Public void checkLogin(){
   LoginPage.enterUserName("UserName");
   LoginPage.enterPassword("Password");
   HomePage homePage = LoginPage.submit();
   Assert.assertNotNull(homePage);
}
```

### BDD 情景描述

```markdown
Scenario: Login check
Given: I am on the login page 
When: I enter "username" username
And: I enter "Password" password
And: I click on the "Login" button
Then: I am able to login successfully.
```

### BDD 自动化测试脚本

```java
@RunWith(Cucumber.class)
public class MyStepDefinitions {
 
  @Steps
  LoginPage loginPage;
  
  @Steps
  HomePage hp;
 
    @Given("^I am on the login page $")
    public void i_am_on_the_login_page(){
        loginPage = new LoginPage();
    }
 
    @When("^I enter \"([^\"]*)\" username$")
    public void i_enter_something_username(String username) {
      loginPage.enterUserName(username);
    }
 
    @When("^I enter \"([^\"]*)\" password$")
    public void i_enter_something_password(String password) {
       loginPage.enterPassword(password);
    }
 
    @When("^I click on the \"([^\"]*)\" button$")
    public void i_click_on_the_submit_button(String strArg1) {
      hp = loginPage.submit();        
    }
 
    @Then("^I am able to login successfully\.$")
    public void i_am_able_to_login_successfully() {
      Assert.assertNotNull(hp);
    }
}
```
