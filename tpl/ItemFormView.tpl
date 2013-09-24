<div id="CategoryListPanel" class='panel panel-default'>
    <div class="panel-heading"><strong>Add new translation</strong></div>
    <br />
    <form role="form" class="form-horizontal">
        <fieldset>
            <div class="form-group">
                <label for="Word" class="col-lg-2 control-label">Word:</label>
                <div class="col-lg-10">
                    <input type="text" id="Word" name="Word" class="form-control" value="{{Word}}"/>
                </div>
            </div>
            <div class="form-group">
                <label for="Translation1" class="col-lg-2 control-label">Translation:</label>
                <div class="col-lg-10">
                    <input type="text" id="Translation1" name="Translation1" class="form-control" value="{{Translation1}}"/>
                </div>
            </div>
            <div class="form-group">
                <label for="Translation2" class="col-lg-2 control-label">Translation:</label>
                <div class="col-lg-10">
                    <input type="text" id="Translation2" name="Translation2" class="form-control" value="{{Translation2}}"/>
                </div>
            </div>
            <div class="form-group">
                <label for="CategoryId" class="col-lg-2 control-label">Category:</label>
                <div class="col-lg-10">
                    <select id="CategoryId" class="form-control" name="CategoryId">
                        <option value="0">Choose category</option>
                        {{#each categories}}
                        <option value="{{Id}}">{{Name}}</option>
                        {{/each}}
                    </select>
                </div>
            </div>
        </fieldset>
    <div class="form-group">
    <div class="col-lg-offset-2 col-lg-10">
    <a href="#" class="btn btn-default save"> Save </a>
    </div>
    </div>                         
    </form>
</div>