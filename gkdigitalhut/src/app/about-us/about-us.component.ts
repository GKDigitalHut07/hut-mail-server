import { Component } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { BlogResourcesComponent } from '../blog-resources/blog-resources.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { TreeNode } from 'primeng/api';
import { OrganizationChartModule } from 'primeng/organizationchart';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [TabViewModule,BadgeModule,AvatarModule,BlogResourcesComponent,PortfolioComponent,OrganizationChartModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

    selectedNodes!: TreeNode[];

    data: TreeNode[] = [
        {
            expanded: true,
            type: 'person',
            data: {
                image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
                name: 'Gokul Krishnan',
                title: 'CEO & Founder'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    data: {
                        image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/annafali.png',
                        name: 'Dharanidharan',
                        title: 'CTO & Co-Founder'
                    },
                    children: [
                      {
                        expanded: true,
                        type: 'person',
                        data: {
                            image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                            name: 'Kamaleshwar',
                            title: 'Lead Developer'
                        },
                        children: [
                            {
                                label: 'FrontEnd Development'
                            },
                            {
                                label: 'Backend Development'
                            }
                        ]
                    }
                    ]
                },
                {
                  expanded: true,
                  type: 'person',
                  data: {
                      image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                      name: 'Deepak Pranav',
                      title: 'COO'
                  },
                  children: [
                    {
                      expanded: true,
                      type: 'person',
                      data: {
                          image: 'https://primefaces.org/cdn/primeng/images/demo/avatar/stephenshaw.png',
                          name: 'Sindhuja',
                          title: 'Product Designer'
                      },
                      children: [
                          {
                              label: 'Planning'
                          },
                          {
                              label: 'UI/UX Design'
                          }
                      ]
                  }
                  ]
              }
            ]
        }
    ];
}
