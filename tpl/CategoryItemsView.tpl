<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">{{{breadcrumb}}}</div>
    <ul class="list-group" id='CategoryList'>
        {{#each categories}}        
        <li class="link list-group-item" style="height: 44px;" data-category-id="{{Id}}">
            <div class="col-xs-12">
                <span class="col-xs-11 glyphicon glyphicon-chevron-right category-link" style="height: 26px;"> {{Name}} </span>
                <span class="badge test-result-link col-xs-1 padding-medium" style="float: right">{{ObjectAtKey ../scores Id}}</span>
            </div>
        </li>               
        {{/each}}
    </ul>
</div>        