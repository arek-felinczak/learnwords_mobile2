<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading">{{{breadcrumb}}}</div>
    <div class="panel-body hidden" id="helpDiv">
        <p>
            Words are grouped into categories. Please select one to load list of words. 
        </p>
    </div>
    <ul class="list-group" id='CategoryList'>
        {{#each categories}}        
        <li class="link list-group-item" data-category-id="{{Id}}">
            {{Name}} 
        </li>               
        {{/each}}
    </ul>
</div>        