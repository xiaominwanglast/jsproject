export default [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),
    redirect: 'login',
    children: [
      {
        path: '/update',
        name: 'update',
        component: () => import('@/views/update/index.vue'),
      },
      {
        path: '/flow',
        name: 'flow',
        component: () => import('@/views/flow/index.vue'),
        children: [{
          path: '/flow/testtask/add/',
          name: 'flow_testtask_add',
          component: () => import('@/views/flow/testtask/add.vue')
        }, {
          path: '/flow/testtask/detail/:id',
          name: 'flow_testtask_detail',
          component: () => import('@/views/flow/testtask/add.vue')
        }, {
          path: '/flow/testtask/list',
          name: 'flow_testtask_list',
          component: () => import('@/views/flow/testtask/list.vue')
        }, {
          path: '/flow/testtask/mylist',
          name: 'flow_testtask_mylist',
          component: () => import('@/views/flow/testtask/mylist.vue')
        }, {
          path: '/flow/online/add/',
          name: 'flow_online_add',
          component: () => import('@/views/flow/online/add.vue')
        }, {
          path: '/flow/online/detail/:id',
          name: 'flow_online_detail',
          component: () => import('@/views/flow/online/add.vue')
        }, {
          path: '/flow/online/list',
          name: 'flow_online_list',
          component: () => import('@/views/flow/online/list.vue')
        }, {
          path: '/flow/online/mylist',
          name: 'flow_online_mylist',
          component: () => import('@/views/flow/online/mylist.vue')
        }, {
          path: '/flow/form/template',
          name: 'flow_form_template',
          component: () => import('@/views/flow/form/template.vue')
        }, {
          path: '/flow/form/project',
          name: 'flow_form_project_header',
          component: () => import('@/views/flow/form/project_header.vue'),
          children: [
            {
              path: '/flow/form/project/:group_name/',
              name: 'flow_form_project_body_group_name',
              component: () => import('@/views/flow/form/project_body.vue')
            },
            {
              path: '/flow/form/project/:group_name/:project_id',
              name: 'flow_form_project_body_group_name_project_id',
              component: () => import('@/views/flow/form/project_body.vue')
            },
            {
              path: '/flow/form/project/:group_name/:project_id/:task_id',
              name: 'flow_form_project_body_group_name_project_id_task_id',
              component: () => import('@/views/flow/form/project_body.vue')
            }
          ]
        }]

      },
      {
        path: '/database',
        name: 'database',
        component: () => import('@/views/database/index.vue'),
        children: [{
          path: '/database/audit/add',
          name: 'database_audit_add',
          component: () => import('@/views/database/audit/add.vue')
        }, {
          path: '/database/audit/detail/:id',
          name: 'database_audit_detail',
          component: () => import('@/views/database/audit/add.vue')
        }, {
          path: '/database/audit/change_config',
          name: 'database_audit_change_config',
          component: () => import('@/views/database/audit/change_config.vue')
        }, {
          path: '/database/audit/change_notice',
          name: 'database_audit_change_notice',
          component: () => import('@/views/database/audit/change_notice.vue')
        }, {
          path: '/database/audit/list',
          name: 'database_audit_list',
          component: () => import('@/views/database/audit/list.vue')
        }, {
          path: '/database/audit/mylist',
          name: 'database_audit_mylist',
          component: () => import('@/views/database/audit/mylist.vue')
        }]

      },
      {
        path: '/tmt',
        name: 'tmt',
        component: () => import('@/views/tmt/index.vue'),
      },
      // {
      //   path: '/devops',
      //   name: 'devops',
      //   component: () => import('@/views/devops/index.vue'),
      //   children: [{
      //     path: '/devops/server_list/:env/:dept',
      //     name: 'devops_server_list',
      //     component: () => import('@/views/devops/devops/devops.vue')
      //   }, {
      //     path: '/devops/history/:env',
      //     name: 'devops_history',
      //     component: () => import('@/views/devops/devops/history.vue')
      //   }, {
      //     path: '/devops/information/',
      //     name: 'devops_information',
      //     component: () => import('@/views/devops/devops/information.vue')
      //   },{
      //     path: '/devops/add_server/',
      //     name: 'devops_add_server',
      //     component: () => import('@/views/devops/devops/addserver.vue')
      //   },
      //   ]
      // },
      {
        path: '/tools',
        name: 'tools',
        component: () => import('@/views/tools/index.vue'),
        children: [{
          path: '/tools/dbtools/:env',
          name: 'tools_dbtools',
          component: () => import('@/views/tools/tools/db.vue')
        }, {
          path: '/tools/account',
          name: 'tools_account',
          component: () => import('@/views/tools/tools/adduser.vue')
        }, {
          path: '/tools/bugtools',
          name: 'tools_bugtools',
          component: () => import('@/views/tools/tools/bugtools.vue')
        }, {
          path: '/tools/loanmongo',
          name: 'tools_loanmongo',
          component: () => import('@/views/tools/tools/loanmongo.vue')
        }, {
          path: '/tools/createcard',
          name: 'tools_createcard',
          component: () => import('@/views/tools/tools/createcard.vue')
        }, {
          path: '/tools/endecryption',
          name: 'tools_endecryption',
          component: () => import('@/views/tools/tools/endecryption.vue')
        },
          {
            path: '/tools/comparetable',
            name: 'tools_comparetable',
            component: () => import('@/views/tools/tools/comparetable.vue')
          },
        ]
      },
      {
        path: '/autotest',
        name: 'autotest',
        component: () => import('@/views/autotest/index.vue'),
        children: [
          {
            path: '/autotest/:id',
            name: 'autotest_top',
            component: () => import('@/views/autotest/top.vue'),
            children: [
              {
                path: '/autotest/:id/overview',
                name: 'autotest_overview',
                component: () => import('@/views/autotest/overview.vue')
              },
              {
                path: '/autotest/project/TJ/:id',
                name: 'autotest_overview',
                component: () => import('@/views/autotest/overview.vue')
              },
              {
                path: '/autotest/:id/test',
                name: 'autotest_test',
                component: () => import('@/views/autotest/test.vue'),
                children: [
                  {
                    path: '/autotest/:id/test/:suite_name',
                    name: 'autotest_case',
                    component: () => import('@/views/autotest/test.vue')
                  }
                ]
              },
              //add by cc
              // {
              //   path: '/autotest/:id/testng',
              //   name: 'autotest_testng',
              //   component: () => import('@/views/autotest/testng.vue'),
              //   children: [
              //     {
              //       path: '/autotest/:id/testng/:suite_name',
              //       name: 'autotest_testng_case',
              //       component: () => import('@/views/autotest/testng.vue')
              //     }
              //   ]
              // },
              //end by cc
              {
                path:'/autotest/:id/fatortest',
                name:'autotest_test_factor',
                component:() => import('@/views/autotest/factortest.vue')
                // children:[]
              },
              {
                path: '/autotest/:id/result',
                name: 'autotest_result',
                component: () => import('@/views/autotest/result.vue'),
                children:[
                  {
                    path: '/autotest/:id/result/:status_id',
                    name:"autotest_result_status",
                    component: () => import('@/views/autotest/result.vue')
                  }
                ]
              }
            ]
          }
        ]

      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  }

  /*  下面为示例  */
  //
  // {
  //     path: '/',
  //     alias: '/testflow',
  //     name: 'testflow',
  //     component: () => import('@/views/flow/index'),
  //     children: [
  //         {
  //             path: '/testtask',
  //             component: () => import('@/views/flow')
  //         }
  //     ]
  // },
  //
  // {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  // }, {
  //     path: '/argu/:name',
  //     component: () => import('@/views/argu.vue')
  // }, {
  //     path: '/parent',
  //     component: () => import('@/views/parent.vue'),
  //     children: [
  //         {
  //             path: 'child',
  //             component: () => import('@/views/child.vue')
  //         }
  //     ]
  // }, {
  //     path: '/named_view',
  //     components: {
  //         default: () => import('@/views/child.vue'),
  //         email: () => import('@/views/email.vue'),
  //         tel: () => import('@/views/tel.vue')
  //     }
  // }, {
  //     path: '/main',
  //     redirect: to => {
  //         return {
  //             name: 'home'
  //         }
  //     }
  //
  // }
]
